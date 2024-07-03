import SignUpCardComponent from '../components/SignUpCard';

export default function SignUpScreen() {
  return (
    <div className="flex">
      <SignUpCardComponent />
      <div
        className="h-screen w-full bg-center bg-cover hidden lg:block  relative object-contain"
        style={{
          backgroundImage: "url('/images/background-2.jpg')",
        }}
      ></div>
    </div>
  );
}
