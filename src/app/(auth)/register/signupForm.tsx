// I will be using RHF isSubmitting to get used to it but I must
// use useState here cause of redirect() in actions (auth.ts).

"use client";

import { useState, useEffect, useRef } from "react";
import {
  signUp,
  signInWithGoogle,
  verifySignupOtp,
  resendSignupOtp,
} from "@/actions/auth";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/validation/signup";
import Image from "next/image";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { MailCheck, ArrowLeft, Loader2 } from "lucide-react";

export default function SignupForm({ next }: { next?: string }) {
  const [step, setStep] = useState<"register" | "otp">("register");
  const [loading, setLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // OTP state
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // Cooldown countdown effect
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Focus OTP input when switching to OTP step
  useEffect(() => {
    if (step === "otp") {
      otpInputRef.current?.focus();
    }
  }, [step]);

  async function formSubmitHandler(values: FieldValues) {
    setLoading(true);

    const result = await signUp(values, next);
    if (result?.error) {
      setError("root", {
        message: result.error,
      });
      setLoading(false);
      return;
    }

    if (result?.success && result.email) {
      setRegisteredEmail(result.email);
      setStep("otp");
      setResendCooldown(60);
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    const result = await signInWithGoogle(next);
    if (result?.error) {
      setError("root", {
        message: result.error,
      });
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (otp.length !== 6) return;

    setOtpLoading(true);
    setOtpError(null);

    const result = await verifySignupOtp({
      email: registeredEmail,
      token: otp,
      next,
    });

    if (result?.error) {
      setOtpError(result.error);
      setOtpLoading(false);
    }
  }

  async function handleResendCode() {
    if (resendCooldown > 0 || !registeredEmail) return;

    setOtpError(null);
    setResendMessage(null);

    const result = await resendSignupOtp(registeredEmail);
    if (result?.error) {
      setOtpError(result.error);
    } else {
      setResendMessage("A new verification code has been sent!");
      setResendCooldown(60);
      setTimeout(() => setResendMessage(null), 4000);
    }
  }

  // =========================================================================
  // STEP 2: 6-DIGIT EMAIL OTP VERIFICATION
  // =========================================================================
  if (step === "otp") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Verify your email
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
            We sent a 6-digit confirmation code to{" "}
            <span className="font-semibold text-foreground break-all">
              {registeredEmail}
            </span>
          </p>
        </div>

        {otpError && (
          <div className="text-xs text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-lg text-center font-medium">
            {otpError}
          </div>
        )}

        {resendMessage && (
          <div className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 p-3 rounded-lg text-center font-medium">
            {resendMessage}
          </div>
        )}

        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="otp-input"
              className="text-xs font-semibold text-muted-foreground block text-center uppercase tracking-wider"
            >
              Enter 6-digit code
            </label>
            <input
              ref={otpInputRef}
              id="otp-input"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                setOtp(val);
                if (val.length === 6) {
                  setOtpError(null);
                }
              }}
              placeholder="••••••"
              className="w-full text-center tracking-[0.5em] font-mono font-bold text-2xl py-3 px-4 rounded-xl border border-input bg-background shadow-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={otp.length !== 6 || otpLoading}
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-default flex items-center justify-center gap-2"
          >
            {otpLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify & Continue</span>
            )}
          </button>
        </form>

        <div className="space-y-3 pt-2 text-center text-xs">
          <div>
            {resendCooldown > 0 ? (
              <span className="text-muted-foreground">
                Resend code in{" "}
                <span className="font-semibold text-foreground">
                  {resendCooldown}s
                </span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                className="text-primary hover:underline font-medium cursor-default"
              >
                Didn&apos;t receive code? Resend
              </button>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                setStep("register");
                setOtp("");
                setOtpError(null);
              }}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-default"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Wrong email? Edit details</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STEP 1: REGISTRATION FORM
  // =========================================================================
  return (
    <FieldGroup>
      {errors.root && (
        <FieldError className="mb-4 text-sm text-black bg-[#ef767a] p-3 rounded">
          {errors.root.message}
        </FieldError>
      )}

      <form onSubmit={handleSubmit(formSubmitHandler)} className="space-y-4">
        <FieldGroup>
          <Field data-invalid={!!errors.full_name}>
            <div className="w-fit">
              <FieldLabel htmlFor="full_name">Full Name</FieldLabel>
            </div>
            <input
              id="full_name"
              {...register("full_name")}
              type="text"
              className="w-full outline-0 border border-input shadow-sm rounded-lg px-3 py-2 text-base md:text-sm focus:outline-3 focus:border-muted transition-all duration-150"
            />
            {errors.full_name && (
              <FieldError>{errors.full_name.message}</FieldError>
            )}
          </Field>

          <Field data-invalid={!!errors.email}>
            <div className="w-fit">
              <FieldLabel htmlFor="email">Email</FieldLabel>
            </div>
            <input
              id="email"
              {...register("email")}
              type="email"
              className="w-full outline-0 border border-input shadow-sm rounded-lg px-3 py-2 text-base md:text-sm focus:outline-3 focus:border-muted transition-all duration-150"
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.password}>
            <div className="w-fit">
              <FieldLabel htmlFor="password">Password</FieldLabel>
            </div>
            <input
              id="password"
              {...register("password")}
              type="password"
              className="w-full outline-0 border border-input shadow-sm rounded-lg px-3 py-2 text-base md:text-sm focus:outline-3 focus:border-muted transition-all duration-150"
            />
            {errors.password && (
              <FieldError>{errors.password.message}</FieldError>
            )}
          </Field>

          <Field>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-black outline-0 text-white py-2 rounded-lg text-sm font-medium hover:tracking-[0.5px] transition-all duration-150 focus:outline-4 focus:border-muted disabled:opacity-50 disabled:cursor-not-allowed cursor-default"
            >
              {isSubmitting || loading ? "Please wait..." : "Create Account"}
            </button>
          </Field>
        </FieldGroup>
      </form>

      <FieldSeparator />

      <Field>
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full outline-0 flex items-center justify-center gap-3 border border-input shadow-sm py-2 rounded-lg text-sm font-medium hover:tracking-[0.5px] transition-tracking duration-150 focus:outline-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-default"
        >
          <Image width={15} height={15} src="/google.svg" alt="google" />
          Continue with Google
        </button>
      </Field>
    </FieldGroup>
  );
}
