import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="p-20 mx-auto text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        This is a personal project created for educational and demonstration
        purposes only. We do not collect, store, or share any personal data or
        media beyond what's required temporarily for the functionality of the
        app.
      </p>
      <p className="mb-4">
        All interactions with Instagram are done securely using Meta's Graph
        API, and no user information is stored on our servers.
      </p>
      <p className="mb-4">
        By using this application, you acknowledge that your data remains
        private and secure. We do not retain login credentials, comments, media,
        or profile data beyond the session.
      </p>
      <p className="mb-4">
        For more details on how Instagram data is handled, please refer to
        Meta’s official privacy policy:
        <br />
        <a
          href="https://www.facebook.com/privacy/policy/"
          className="text-blue-400 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Meta Privacy Policy
        </a>
      </p>
      <p className="text-sm text-gray-400 mt-6">Last updated: April 10, 2025</p>
    </section>
  );
};

export default PrivacyPolicy;
