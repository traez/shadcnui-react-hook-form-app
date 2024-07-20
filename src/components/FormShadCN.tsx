"use client"; // Indicates that this file should be treated as a client-side component
import { z } from "zod"; // Importing zod for schema validation
import { useForm } from "react-hook-form"; // Importing useForm hook from react-hook-form for form handling
import { zodResolver } from "@hookform/resolvers/zod"; // Importing zodResolver to integrate zod with react-hook-form
import { Button } from "@/components/ui/button"; // Importing Button component
import { Input } from "@/components/ui/input"; // Importing Input component
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Importing form-related components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Importing select-related components

// Defining the schema for form validation using zod
const formSchema = z
  .object({
    emailAddress: z.string().email(), // Email address should be a string and a valid email
    password: z.string().min(8), // Password should be a string with a minimum length of 8
    passwordConfirm: z.string(), // Password confirmation should be a string
    accountType: z.enum(["personal", "company"]), // Account type should be either 'personal' or 'company'
    companyName: z.string().optional(), // Company name is optional
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm; // Check if password and passwordConfirm are the same
    },
    {
      message: "Passwords do not match", // Error message if passwords do not match
      path: ["passwordConfirm"], // Error path for the passwordConfirm field
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "company") {
        return !!data.companyName; // If account type is 'company', companyName should not be empty
      }
      return true; // If account type is 'personal', companyName can be empty
    },
    {
      message: "Company name is required", // Error message if companyName is empty when account type is 'company'
      path: ["companyName"], // Error path for the companyName field
    }
  );

const FormShadCN = () => {
  // Initialize the form with useForm hook and zod schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Use zodResolver for validation
    defaultValues: {
      emailAddress: "", // Default value for emailAddress field
      password: "", // Default value for password field
      passwordConfirm: "", // Default value for passwordConfirm field
      companyName: "", // Default value for companyName field
    },
  });

  const accountType = form.watch("accountType"); // Watch the accountType field to dynamically show/hide companyName field

  // Function to handle form submission
  const onHandleSubmit = (values: z.infer<typeof formSchema>) => {
    // Simulate a 1 second delay before processing
  setTimeout(() => {
    console.log(values); // Log the form values after a 1 second delay
  }, 1000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onHandleSubmit)} // Handle form submission
          className="max-w-md w-full flex flex-col gap-4" // Form styles
        >
          <FormField
            control={form.control} // Pass form control to FormField
            name="emailAddress" // Name of the field
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel> {/* Label for the email address field */}
                <FormControl>
                  <Input placeholder="Email address" type="email" {...field} /> 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {accountType === "company" && (
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password confirm</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password confirm"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default FormShadCN;

/*
This return statement renders the form using the initialized form instance. The <Form> component from "@/components/ui/form" wraps the entire form, providing context and state management. Inside it, each <FormField> component represents a field in the form, including input fields for the email address, password, and password confirmation. 

A <Select> component is used for selecting the account type, with options for 'personal' and 'company'. If 'company' is selected, an additional input field for the company name is conditionally rendered. Each field includes labels, input controls, and messages to display validation errors.

The form also includes a submit button that triggers the onHandleSubmit function, which logs the form values after a one-second delay. The overall structure and styling are defined using Tailwind CSS classes, ensuring a responsive and user-friendly layout.
*/
