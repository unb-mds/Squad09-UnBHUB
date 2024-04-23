import SignUpCardComponent from '../components/SignUpCard';

export default function SignUpScreen() {
  return (
    <div className="flex">
      <SignUpCardComponent />
      <div
        style={{
          backgroundImage: "url('public/images/background-2.jpg')",
        }}
      ></div>
    </div>
  );
}
