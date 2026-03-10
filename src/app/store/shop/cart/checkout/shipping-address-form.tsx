'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ContainerSimple, Grid } from '@/components/_ui/containers/container-simple';

// 1. Define the Validation Schema
const addressSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  postalCode: z.string().min(5, "Invalid postal code"),
  country: z.string().min(1, "Please select a country"),
  isDefault: z.boolean().optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export function ShippingAddressForm() {
  const {register,handleSubmit,formState: { errors, isSubmitting }} = useForm<AddressFormData>({ 
        resolver: zodResolver(addressSchema),
        defaultValues: {
        country: "IN", // Default to India
        isDefault: false,
    }});

  const onSubmit = async (data: AddressFormData) => {
    // Simulate API call
    console.log("Shipping Data Verified:", data);
    // Here you would typically move the user to the Payment Step
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-2xl border border-neutral-100">
        <h2 className="text-2xl text-gray-500 font-bold mb-6">Shipping Address </h2>

      <ContainerSimple className="gap-4 text-left">
        
        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-neutral-700">Full Name</label>
          <input 
            {...register("fullName")}
            placeholder="John Doe"
            className={`p-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-neutral-200'} focus:outline-none focus:ring-2 focus:ring-black`}
          />
          {errors.fullName && <span className="text-xs text-red-500">{errors.fullName.message}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-neutral-700">Email Address</label>
          <input 
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            className={`p-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-neutral-200'} focus:outline-none focus:ring-2 focus:ring-black`}
          />
          {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
        </div>

        {/* Street Address */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-semibold text-neutral-700">Street Address</label>
          <input 
            {...register("street")}
            placeholder="123 Luxury Lane, Apt 4B"
            className={`p-3 rounded-lg border ${errors.street ? 'border-red-500' : 'border-neutral-200'} focus:outline-none focus:ring-2 focus:ring-black`}
          />
          {errors.street && <span className="text-xs text-red-500">{errors.street.message}</span>}
        </div>

        {/* City */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-neutral-700">City</label>
          <input 
            {...register("city")}
            className="p-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Postal Code */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-neutral-700">PIN / Postal Code</label>
          <input 
            {...register("postalCode")}
            className="p-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-neutral-700">Phone Number</label>
          <input 
            {...register("phone")}
            placeholder="+91 98765 43210"
            className="p-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Country Selector */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-neutral-700">Country</label>
          <select 
            {...register("country")}
            className="p-3 rounded-lg border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
          </select>
        </div>
      </ContainerSimple>

      <div className="flex items-center gap-2 pt-2">
        <input type="checkbox" {...register("isDefault")} id="isDefault" className="w-4 h-4 accent-black" />
        <label htmlFor="isDefault" className="text-sm text-neutral-600">Save as default shipping address</label>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transition-all disabled:bg-neutral-400"
      >
        {isSubmitting ? "Processing..." : "Continue to Payment"}
      </button>
    </form>
  );
}