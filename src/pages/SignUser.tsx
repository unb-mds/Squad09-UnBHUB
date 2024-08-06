import SignUserCardComponent from '../components/SignUserCard';

export default function SignUserScreen() {
  return (
    <div className="flex">
      <SignUserCardComponent />
      <div
        className="h-screen w-full bg-center bg-cover hidden lg:block  relative object-contain"
        style={{
          backgroundImage: "url('/images/background-2.jpg')",
        }}
      ></div>
    </div>
  );
}
