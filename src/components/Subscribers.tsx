import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Subscribers = () => {
  return (
    <div className="flex flex-col justify-center items-center my-4">
    <Card>
        <CardHeader>
            <CardTitle>Practice makes perfect!</CardTitle>
            <CardDescription>All form responses logged to the Console</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Wow! Trae Zeeofor's doings</p>
        </CardContent>
        <CardFooter>
            <p>The current time is: {new Date().toTimeString()}</p>
        </CardFooter>
    </Card>
</div>
  );
};

export default Subscribers;
