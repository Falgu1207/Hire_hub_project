import React, { useState } from "react";
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import { addJobDetails } from "../operations/jobDetailsAPI";
import { useSelector } from "react-redux";

const fields = [
  {
    name: "companyName",
    label: "Company Name",
    placeholder: "Acme Inc",
    input: "input",
  },
  {
    name: "companyDescription",
    label: "Company Description",
    placeholder: "Describe your company",
    input: "textarea",
  },
  {
    name: "jobTitle",
    label: "Job Title",
    placeholder: "Software Engineer",
    input: "input",
  },
  {
    name: "jobDescription",
    label: "Job Description",
    placeholder: "Describe the job responsibilities",
    input: "textarea",
  },
  {
    name: "location",
    label: "Location",
    placeholder: "San Francisco, CA",
    input: "input",
  },
  {
    name: "role",
    label: "Role",
    placeholder: "Select role",
    options: [
      { value: "full-time", text: "Full-Time" },
      { value: "part-time", text: "Part-Time" },
      { value: "contract", text: "Contract" },
      { value: "internship", text: "Internship" },
    ],
    input: "select",
  },
  {
    name: "experience",
    label: "Experience",
    placeholder: "Select experience level",
    options: [
      { value: "entry-level", text: "Entry-Level" },
      { value: "mid-level", text: "Mid-Level" },
      { value: "senior-level", text: "Senior-Level" },
    ],
    input: "select",
  },
  {
    name: "salary",
    type: "number",
    label: "Salary",
    placeholder: "$50,000 - $80,000",
    input: "input",
  },
  {
    name: "skills",
    label: "Skills",
    placeholder: "List the required skills",
    input: "textarea",
  },
];

const Page = () => {
  const methods = useForm({
    defaultValues: {
      companyName: "",
      companyDescription: "",
      jobTitle: "",
      jobDescription: "",
      location: "",
      role: "",
      experience: "",
      salary: "",
      skills: "",
    },
    mode: "onBlur", // Validate on blur
  });

  const { handleSubmit, reset } = methods;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useSelector((state) => state.auth); // Assuming auth slice contains token

  const onSubmit = async (values) => {
    try {
      await addJobDetails(values, token); // Call async function to add job details
      reset(); // Resetting the form after submission
      setIsModalOpen(true); // Open modal on successful submission
    } catch (error) {
      console.error('Error adding job:', error);
      // Handle error or display error message to user
    }
  };

  return (
    <>
      <Header />
      <FormProvider {...methods}>
        <div className="pl-24">
      <h2 className="text-3xl py-2 ">Post a New Job</h2>
      <p className="text-gray-500">Fill out the form below to create a new job posting.</p>
      </div>
        <div className="flex gap-4 px-20">
          
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[75%] px-5 py-5">
          {fields.map((field) => (
            <FormField key={field.name} {...field} />
          ))}
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Submit
          </button>
        </form>
        

<div class=" my-10 hover:shadow-lg duration-700 h-[420px] w-96 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8">
    <h5 class="mb-6 text-3xl font-bold text-gray-900 ">Get more updates...</h5>
   
    <form className="grid">
      <input type="email" placeholder="Enter your email" className="border-gray-200 border-2 py-1 px-2 rounded-lg" required />
      <button className="bg-blue-600 my-4 py-1 text-white font-semibold rounded-lg">Subscribe Now</button>
      <p className="text-gray-500 py-3 text-md">Subscribe now to stay updated with the latest job postings and career advice. Be the first to know about exclusive job opportunities tailored to your skills and interests, helping you to advance your career and seize the best opportunities available.</p>
    </form>
    
</div>

        </div>
      </FormProvider>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Job Posted Successfully</h2>
          <p className="mb-4">Thank you for posting the job. It has been successfully added.</p>
          <button onClick={() => setIsModalOpen(false)} className="bg-blue-500 text-white py-2 px-4 rounded">
            <Link to="/">Close</Link>
          </button>
        </div>
      </Modal>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

const FormField = ({ name, label, placeholder, input, options, type }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {input === "input" && (
        <Controller
          control={control}
          name={name}
          render={({ field }) => <input {...field} type={type || "text"} placeholder={placeholder} className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" />}
        />
      )}
      {input === "textarea" && (
        <Controller
          control={control}
          name={name}
          render={({ field }) => <textarea {...field} placeholder={placeholder} className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" />}
        />
      )}
      {input === "select" && (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <select {...field} placeholder={placeholder} className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500">
              <option value="" disabled hidden>{placeholder}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>{option.text}</option>
              ))}
            </select>
          )}
        />
      )}
      <span className="text-red-500 text-sm">{errors[name]?.message}</span> {/* Display validation error messages */}
    </div>
  );
};

export default Page;
