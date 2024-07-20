import Subscribers from "@/components/Subscribers";
import SubscriptionForm from "@/components/SubscriptionForm";
import ReactHookForm from "@/components/ReactHookForm";
import FormShadCN from "@/components/FormShadCN";

export default function Home() {
  return (
    <main className="flex flex-col justify-around p-4">
      <Subscribers/>
      <SubscriptionForm/>
      <ReactHookForm/>
      <FormShadCN/>
    </main>
  );
}

/*
 <Subscribers/>
*/