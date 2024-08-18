export default function Privacy() {
    return (
        <div className="py-6 px-4 md:px-10">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <h1 className="text-xl mb-4">Last Updated: August 14, 2024</h1>{" "}
            <p className="mb-6">
                Mochi (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) values your
                privacy and is committed to protecting your personal data. This Privacy
                Policy outlines the types of information we collect, how we use it, and
                the steps we take to ensure your data is secure.
            </p>
            <h2 className="text-xl mb-4">1. Information We Collect</h2>
            <h3 className="text-lg mb-4">1.1. Information You Provide</h3>
            <ul className="list-disc list-inside mb-6 pl-5">
                <li>
                    Account Information: When you create an account on
                    Mochi, we collect information such as your avatars, username, email
                    address, and password.
                </li>
                <li>
                    Community Features: When you participate in community
                    threads, comments, or collections, we may collect the content you
                    create, such as posts and messages.
                </li>
            </ul>
            <h3 className="text-lg mb-4">
                1.2. Information We Do Not Collect
            </h3>
            <ul className="list-disc list-inside mb-6 pl-5">
                <li>
                    No Technical Data: We do not collect or store
                    information such as your IP address, browser type, operating system,
                    or device information. Please note that our authentication provider,
                    Clerk, may collect some of this information as described in {" "}
                    <a
                        href="https://clerk.com/legal/privacy"
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        their Privacy Policy
                    </a>
                    .
                </li>
            </ul>
            <h2 className="text-xl mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside mb-6 pl-5">
                <li>
                    To Provide the Service: We use the information you
                    provide to manage your account and facilitate your use of Mochi,
                    including personalizing your experience.
                </li>
                <li>
                    To Communicate with You: We may use your email
                    address to send you service-related communications, such as account
                    updates and support messages.
                </li>
            </ul>
            <h2 className="text-xl mb-4">3. Sharing Your Information</h2>
            <ul className="list-disc list-inside mb-6 pl-5">
                <li>
                    With Third-Party Service Providers: We may share your
                    information with third-party service providers who assist us in
                    operating Mochi, such as authentication provider, hosting providers,
                    and analytics services.
                </li>
                <li>
                    With Legal Authorities: We may disclose your
                    information if required to do so by law or if we believe that such
                    action is necessary to comply with legal obligations, protect our
                    rights, or ensure the safety of our users.
                </li>
            </ul>
            <h2 className="text-xl mb-4">4. Your Rights and Choices</h2>
            <ul className="list-disc list-inside mb-6 pl-5">
                <li>
                    Access and Update: You have the right to access and
                    update your personal information at any time by logging into your
                    account settings.
                </li>
                <li>
                    Delete Account: You may request the deletion of your
                    account and personal data from your profile settings.
                </li>
                <li>
                    Cookies: You can manage your cookie preferences
                    through your browser settings. Please note that disabling cookies may
                    affect your ability to use certain features of Mochi.
                </li>
            </ul>
            <h2 className="text-xl mb-4">
                6. Changes to This Privacy Policy
            </h2>
            <p className="mb-6">
                We may update this Privacy Policy from time to time to reflect changes
                in our practices or for legal reasons. We will notify you of any
                significant changes by posting the new policy on Mochi and updating the
                &quot;Last Updated&quot; date. Your continued use of the Service after
                the changes have been posted constitutes your acceptance of the new
                policy.
            </p>
            <h2 className="text-xl mb-4">7. Contact Us</h2>
            <p>
                If you have any questions or concerns about this Privacy Policy or our
                data practices, please contact us at{" "}
                <a
                    href="mailto:swargarajbhowmik.mochi@gmail.com"
                    className="text-blue-500 hover:underline"
                >
                    swargarajbhowmik.mochi@gmail.com
                </a>
                .
            </p>
        </div>
    );
}
