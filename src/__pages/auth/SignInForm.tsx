import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MyButton } from "@/components/inputs";
import { useSignInMutation } from "@/state/features/auth/authApi";
import { toasty } from "@/components/toaster";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { LoaderCircleIcon } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),

  password: z.string().min(2, {
    message: "password must be at least 8 characters.",
  }),
});

const SignInForm = () => {
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signIn(values).unwrap();
      toasty("Log in successful", "success");
      navigate("/");
    } catch (error) {
      toasty(
        "Log in failed. Please check you credentials then try again!",
        "error"
      );

      return error;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@example.com"
                  className="placeholder:text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  className="placeholder:text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MyButton
          type="submit"
          className={`${
            isLoading ? "cursor-not-allowed bg-blue-300" : ""
          } bg-blue-500 w-full hover:bg-blue-400`}
        >
          <span>Log in</span>

          {isLoading && <LoaderCircleIcon />}
        </MyButton>
      </form>
    </Form>
  );
};
export default SignInForm;
