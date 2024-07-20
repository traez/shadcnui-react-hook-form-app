"use client"; // This directive tells Next.js to render this component on the client side.
import { SubmitHandler, useForm } from "react-hook-form"; // Importing necessary functions and types from the react-hook-form library.
import { z } from "zod"; // Importing the zod library for schema validation.
import { zodResolver } from "@hookform/resolvers/zod"; // Importing the zodResolver to integrate zod with react-hook-form.

const schema = z.object({
  // Defining the validation schema using zod.
  email: z.string().email(), // The email field must be a valid email string.
  password: z.string().min(8), // The password field must be at least 8 characters long.
});

const ReactHookForm = () => {
  // Defining the React component.
  const form = useForm<z.infer<typeof schema>>({ // Using useForm hook to handle form logic.
    defaultValues: {
      email: "traezeeofor@gmail.com", // Setting default value for email field.
    },
    resolver: zodResolver(schema), // Using zodResolver to validate form data against the schema.
  });

  const {
    register, // Function to register input fields.
    handleSubmit, // Function to handle form submission.
    setError, // Function to set custom errors.
    formState: { errors, isSubmitting }, // Extracting errors and submission state from formState.
  } = form;

  const onHandleSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => { // Inferring the TypeScript type from the schema.
    // Defining the submit handler function.
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating an asynchronous operation.
      //throw new Error();
      console.log(data); // Logging form data to the console.
    } catch (error) {
      setError("root", {
        // Setting a custom error for the entire form (useful for server-side or asynchronous validation errors).
        message: "This email is already taken",
      });
    }
  };

  return (
    <form
      className="flex flex-col px-4 py-2 gap-2" // Styling the form with Tailwind CSS classes.
      onSubmit={handleSubmit(onHandleSubmit)} // Handling form submission using handleSubmit.
    >
      <div>
        <label htmlFor="username">Email:</label>{" "}
        {/* Label for the email input field. */}
        <input
          {...register("email")} // Registering the email input field.
          type="text" // Setting input type to text.
          placeholder="email" // Setting a placeholder for the email input.
          className="rounded-md border border-background-700 px-2 py-1 shadow-lg outline-none" // Styling the email input with Tailwind CSS.
        />
        {errors.email && ( // Displaying email validation errors, if any.
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="password">Password:</label>{" "}
        {/* Label for the password input field. */}
        <input
          {...register("password")} // Registering the password input field.
          type="password" // Setting input type to password.
          placeholder="password" // Setting a placeholder for the password input.
          className="rounded-md border border-background-700 px-2 py-1 shadow-lg outline-none" // Styling the password input with Tailwind CSS.
        />
        {errors.password && ( // Displaying password validation errors, if any.
          <div className="text-red-500">{errors.password.message}</div>
        )}
      </div>
      <button
        type="submit" // Setting button type to submit.
        className=" rounded-md px-6 py-2 text-black hover:opacity-50" // Styling the submit button with Tailwind CSS.
        disabled={isSubmitting} // Disabling the button while the form is submitting.
      >
        {isSubmitting ? "Loading..." : "Submit"}{" "}
        {/* Displaying loading text while submitting. */}
      </button>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}{" "}
      {/* Displaying root-level errors, if any. */}
    </form>
  );
};

export default ReactHookForm;
