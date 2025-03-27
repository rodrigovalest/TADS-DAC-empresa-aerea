"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const RegisterForm: React.FC<{ onSubmit: SubmitHandler<IRegister> }> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 w-96">
      <h2 className="text-3xl font-medium mb-4 text-center text-white">Autocadastro</h2>

      <div className="mb-2">
        <label htmlFor="cpf" className="block font-light text-white pb-2">CPF</label>
        <input 
          type="text" 
          id="cpf"
          placeholder="CPF" 
          {...register("cpf", { required: "CPF is required" })} 
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.cpf && <p className="text-red-500">{errors.cpf.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="name" className="block font-light text-white pb-2">Name</label>
        <input 
          type="text" 
          id="name"
          placeholder="Name" 
          {...register("name", { required: "Name is required" })} 
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="email" className="block font-light text-white pb-2">Email</label>
        <input 
          type="email" 
          id="email"
          placeholder="example@email.com" 
          {...register("email", { required: "Email is required" })} 
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="zipCode" className="block font-light text-white pb-2">ZIP Code</label>
        <input 
          type="text" 
          id="zipCode"
          placeholder="ZIP Code" 
          {...register("zipCode", { required: "ZIP Code is required" })} 
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.zipCode && <p className="text-red-500">{errors.zipCode.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="password" className="block font-light text-white pb-2">Password</label>
        <input 
          type="password" 
          id="password"
          placeholder="Password" 
          {...register("password", { required: "Password is required" })} 
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="street" className="block font-light text-white pb-2">Street</label>
        <input 
          type="text" 
          id="street"
          placeholder="Street" 
          {...register("street", { required: "Street is required" })} 
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.street && <p className="text-red-500">{errors.street.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="number" className="block font-light text-white pb-2">Number</label>
        <input 
          type="text" 
          id="number"
          placeholder="Number" 
          {...register("number", { required: "Number is required" })} 
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.number && <p className="text-red-500">{errors.number.message}</p>}
      </div>

      <div className="mb-2">
        <label htmlFor="complement" className="block font-light text-white pb-2">Complement (Optional)</label>
        <input 
          type="text" 
          id="complement"
          placeholder="Complement" 
          {...register("complement")} 
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="city" className="block font-light text-white pb-2">City</label>
        <input 
          type="text" 
          id="city"
          placeholder="City" 
          {...register("city", { required: "City is required" })} 
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="state" className="block font-light text-white pb-2">State</label>
        <input 
          type="text" 
          id="state"
          placeholder="State" 
          {...register("state", { required: "State is required" })} 
          className="w-full p-2 rounded bg-gray-100 border-0 text-gray-800 focus:outline-none"
          autoComplete="off"
        />
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}
      </div>

      <button type="submit" className="w-full bg-amber-800 text-white py-2 rounded font-pathway">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
