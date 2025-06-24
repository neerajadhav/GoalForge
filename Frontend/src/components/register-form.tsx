import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useAuth } from "../contexts/AuthContext"
import { useForm } from "../hooks/useForm"
import { useState } from "react"
import { validateRegisterForm } from "../utils/validation"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string>("");

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: validateRegisterForm,
    onSubmit: async (formValues) => {
      try {
        setSubmitError("");
        await register(formValues);
        navigate("/app", { replace: true });
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "Registration failed. Please try again.");
      }
    },
  });

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your information below to create your account
        </p>
      </div>
      
      {submitError && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
          {submitError}
        </div>
      )}

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input 
            id="username" 
            name="username"
            type="text" 
            placeholder="johndoe" 
            value={values.username}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.username ? "border-destructive" : ""}
          />
          {errors.username && (
            <p className="text-sm text-destructive">{errors.username}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            placeholder="m@example.com" 
            value={values.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password"
            type="password" 
            value={values.password}
            onChange={handleChange}
            disabled={isSubmitting}
            className={errors.password ? "border-destructive" : ""}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Password must be at least 8 characters with uppercase, lowercase, and numbers
          </p>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/auth/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  )
}
