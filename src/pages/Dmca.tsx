import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MailIcon } from "lucide-react";

const Dmca = () => {
  return (
    <div className="mb-6">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>DMCA Takedown Notice</CardTitle>
          <CardDescription>
            If you believe that your copyrighted work has been copied in a way
            that constitutes copyright infringement and is accessible on this
            site, you may notify our copyright agent, as set forth in the
            Digital Millennium Copyright Act of 1998 (DMCA).
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          For your complaint to be valid under the DMCA, you must provide the
          following information when providing notice of the claimed copyright
          infringement:
          <ul className="list-disc list-inside mt-2">
            <li>
              A physical or electronic signature of a person authorized to act
              on behalf of the copyright owner.
            </li>
            <li>
              Identification of the copyrighted work claimed to have been
              infringed.
            </li>
            <li>
              Identification of the material that is claimed to be infringing or
              to be the subject of the infringing activity.
            </li>
            <li>
              Contact information for the notifying party, including name,
              address, telephone number, and email address.
            </li>
            <li>
              A statement that the notifying party has a good faith belief that
              the use of the material in the manner complained of is not
              authorized by the copyright owner, its agent, or the law.
            </li>
            <li>
              A statement, under penalty of perjury, that the information in the
              notification is accurate and that the notifying party is
              authorized to act on behalf of the copyright owner.
            </li>
          </ul>
          You should consult with your own lawyer and/or see 17 U.S.C. § 512 to
          confirm your obligations to provide a valid notice of claimed
          infringement.
        </CardContent>
        <CardFooter className="flex flex-row items-center space-x-1 font-semibold">
          <MailIcon size={16} className="" />
          <p className="text-sm pb-1">subhanyousaf@protonmail.com</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dmca;
