import { Legal } from "@/components/rd/Legal";

const description = "How Rang Décor collects, uses and protects your personal information when you use rangdecor.in.";
export const metadata = { title: "Privacy Policy", description, alternates: { canonical: "/policy/privacy" }, openGraph: { title: "Privacy Policy | Rang Décor", description, url: "/policy/privacy" } };

export default function Privacy() {
  return <Legal eyebrow="Legal" title={<>Privacy <em className="grad">policy.</em></>} lead="How we protect your data at Rang Décor."
    contactLine="If you have any questions about this Privacy Policy, please contact us using the details alongside." other={{ href: "/policy/terms-of-service", label: "Read our Terms of Service" }}
    sections={[
      { h: "Overview", p: ["This page informs you of our policies regarding the collection, use and disclosure of personal information when you use our Service. We will not use or share your information with anyone except as described in this Privacy Policy.", "We use your personal information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used here have the same meanings as in our Terms of Service."] },
      { h: "Information collection and use", p: ["While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you."] },
      { h: "Log data", p: ["Like most websites, our servers may record information that your browser sends whenever you visit the Service, such as your IP address, browser type and version, the pages you visit, and the time and date of your visit."] },
      { h: "Cookies", p: ["Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your computer’s hard drive. We use cookies to collect information.", "You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service."] },
      { h: "Security", p: ["The security of your personal information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security."] },
      { h: "Links to other sites", p: ["Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party’s site. We strongly advise you to review the Privacy Policy of every site you visit.", "We have no control over, and assume no responsibility for, the content, privacy policies or practices of any third-party sites or services."] },
      { h: "Changes to this policy", p: ["We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.", "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page."] },
    ]}/>;
}
