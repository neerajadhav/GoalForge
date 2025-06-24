import { Link, useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useAuth } from "../contexts/AuthContext"
import { useForm } from "../hooks/useForm"
import { useState } from "react"
import { validateLoginForm } from "../utils/validation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitError, setSubmitError] = useState<string>("");

  const from = location.state?.from?.pathname || "/app";

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLoginForm,
    onSubmit: async (formValues) => {
      try {
        setSubmitError("");
        await login(formValues);
        navigate(from, { replace: true });
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "Login failed. Please try again.");
      }
    },
  });

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      
      {submitError && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
          {submitError}
        </div>
      )}

      <div className="grid gap-6">
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
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/auth/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
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
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/auth/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  )
}
