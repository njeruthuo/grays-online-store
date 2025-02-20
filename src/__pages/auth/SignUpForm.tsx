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
import { useSignUpMutation } from "@/state/features/auth/authApi";
import { toasty } from "@/components/toaster";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),

  password: z.string().min(2, {
    message: "password must be at least 8 characters.",
  }),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signUp(values).unwrap();
      toasty("User creation successful. You can now log in...", "success");
      navigate("/sign-in");
    } catch (error) {
      toasty(
        "User registration failed. Please try again with a different email!",
        "error"
      );

      return error;
    }
  }

  return (
    <Form {...form}>
      <div className="text-white font-bold my-2">
        <h2 className="text-2xl my-1">Create an account</h2>
        <p className="text-xl my-2 font-light">
          Please sign up to access our services.
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full text-white"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
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
                  placeholder="shadcn"
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
          className="bg-blue-500 w-full hover:bg-blue-400"
        >
          Sign up
        </MyButton>
      </form>
    </Form>
  );
};
export default SignUpForm;
