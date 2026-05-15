import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  clearAuthTokens,
  getStoredAccessToken,
  getStoredRefreshToken,
  storeAuthTokens,
} from "@/lib/api/client";
import { authService } from "@/lib/api/storefront/services";
import type { AuthResponse, LoginRequest, RegisterRequest, UserProfileDto } from "@/lib/api/storefront/types";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  profile: UserProfileDto | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  error: string | null;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  profile: null,
  status: "idle",
  error: null,
};

function applyAuthResponse(response: AuthResponse) {
  if (!response.success || !response.token) {
    throw new Error(response.message || "Authentication failed");
  }
  storeAuthTokens(response.token, response.refreshToken);
  return {
    accessToken: response.token,
    refreshToken: response.refreshToken ?? null,
  };
}

export const login = createAsyncThunk("auth/login", async (payload: LoginRequest) => {
  const response = await authService.login(payload);
  const tokens = applyAuthResponse(response);
  const profile = await authService.profile();
  return { ...tokens, profile };
});

export const register = createAsyncThunk("auth/register", async (payload: RegisterRequest) => {
  await authService.register(payload);
  const response = await authService.login({ email: payload.email, password: payload.password });
  const tokens = applyAuthResponse(response);
  const profile = await authService.profile();
  return { ...tokens, profile };
});

export const hydrateAuth = createAsyncThunk("auth/hydrate", async () => {
  const accessToken = getStoredAccessToken();
  const refreshToken = getStoredRefreshToken();
  if (!accessToken) return { accessToken: null, refreshToken: null, profile: null };

  try {
    const profile = await authService.profile();
    return { accessToken, refreshToken, profile };
  } catch (error) {
    if (!refreshToken) throw error;
    const response = await authService.refresh(refreshToken);
    const tokens = applyAuthResponse(response);
    const profile = await authService.profile();
    return { ...tokens, profile };
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout().catch(() => undefined);
  clearAuthTokens();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.profile = null;
      state.status = "unauthenticated";
      state.error = null;
      clearAuthTokens();
    },
    setProfile(state, action: PayloadAction<UserProfileDto>) {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.profile = action.payload.profile;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "unauthenticated";
        state.error = action.error.message || "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.profile = action.payload.profile;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "unauthenticated";
        state.error = action.error.message || "Registration failed";
      })
      .addCase(hydrateAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(hydrateAuth.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.profile = action.payload.profile;
        state.status = action.payload.accessToken ? "authenticated" : "unauthenticated";
      })
      .addCase(hydrateAuth.rejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.profile = null;
        state.status = "unauthenticated";
        clearAuthTokens();
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.profile = null;
        state.status = "unauthenticated";
        state.error = null;
      });
  },
});

export const { clearAuthState, setProfile } = authSlice.actions;
export default authSlice.reducer;
