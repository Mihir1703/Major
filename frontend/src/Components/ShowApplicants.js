import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShowApplicants = () => {
    const [applications, setApplications] = useState(undefined);

    React.useEffect(() => {
        const getApplications = async () => {
            const response = await axios.post(`/api/job/posted_by_me`, {
                userId: localStorage.getItem('id')
            });
            console.log(response.data);
            if (response.data.success) {
                setApplications(response.data.jobs);
            } else {
                console.log(response.data.error);
                alert(response.data.error);
            }
        }
        getApplications();
    }, []);
    return (

        <section class="bg-white dark:bg-gray-900">
            <nav class="bg-white shadow dark:bg-gray-800">
                <div class="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                    <Link to="/login" class="text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">
                        {
                            localStorage.getItem('id') ? '' : 'Login'
                        }
                    </Link>
                    <Link to="/allJobs" class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Job Postings</Link>

                    <Link to="/post_job" class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Create Job Posting</Link>

                    <Link to="/myApplications" class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">View Applied Job Details</Link>

                    <Link to="/my_posted_jobs" class="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">View Posted Applicants</Link>
                </div>
            </nav>
            <div class="container px-6 py-16 mx-auto text-center">
                <div class="max-w-lg mx-auto">
                    <h1 class="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">Explore applications for your Job Posting.</h1>

                    <p class="mt-6 text-gray-500 dark:text-gray-300">
                    Explore and manage job applications efficiently with our platform, designed to streamline the hiring process for your job postings.
                    </p>
                </div>
            </div>

            <div class="container px-6 py-10 mx-auto">

                <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
                    {
                        (applications && applications.map((job, index) => {
                            return (
                                <div key={job._id} class="h-[250px]  p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                                    <h1 class="text-xl font-semibold text-gray-700 capitalize dark:text-white">{job.jobTitle}</h1>
                                    <h3 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">{job.companyName}</h3>
                                    <p class="text-gray-500 dark:text-gray-300">{job.jobDescription.substring(0, Math.min(job.jobDescription.length, 150))}...</p>

                                    <Link to={`/applicant/${job._id}`} class="inline-flex p-2 text-blue-500 capitalize transition-colors duration-300 transform bg-blue-100 rounded-full rtl:-scale-x-100 dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </Link>
                                </div>
                            )
                        }))
                    }
                </div>
            </div>
        </section >
    )
}

export default ShowApplicants