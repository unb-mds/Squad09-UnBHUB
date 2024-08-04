import SignInCardComponent from '../components/SignInCard';

export default function SignInScreen() {
  return (
    <div>
      <div
        className="flex bg-center w-full h-screen absolute"
        style={{
          backgroundImage: "url('/images/imagemlogin.jpg')",
        }}
      />
      <SignInCardComponent />
    </div>
  );
}
