import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Loading from "./Loading";

const stripePromise = loadStripe(
  "pk_test_51RpDWkJvn2vRwr79JU1R6wAF7iTOEQh7ycL5IJmk357jRwZczwNXcepEKEWOll1VneNU5d81G0oTrCUqmfPgZEbU009gZZPm4l"
);

function PaymentForm({ donationId, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [amount, setAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!amount) return toast.warn("Please enter an amount");

    // Create payment intent
    const { data } = await axiosSecure.post("/create-payment-intent", {
      amount: parseFloat(amount),
    });

    setClientSecret(data.clientSecret);

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      toast.error(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      await axiosSecure.patch(`/donation-requests/${donationId}`, {
        status: "inprogress",
      });
      toast.success("Donation confirmed!");
      onSuccess();
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input input-bordered w-full"
      />
      <CardElement className="p-3 border rounded" />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        type="submit"
        disabled={!stripe}
      >
        Confirm & Pay
      </button>
    </form>
  );
}

export default function DonationRequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axiosSecure
      .get(`/donation-requests/${id}`)
      .then((res) => setData(res.data))
      .catch(() => toast.error("Failed to load donation details"));
  }, [id, axiosSecure, user, navigate]);

  if (!data) return <div>
    <Loading></Loading>
  </div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Donation Request Details</h2>
      <div className="space-y-2">
        <p>
          <strong>Recipient:</strong> {data.recipient_name}
        </p>
        <p>
          <strong>Hospital:</strong> {data.hospital_name}
        </p>
        <p>
          <strong>Address:</strong> {data.address}
        </p>
        <p>
          <strong>Blood Group:</strong> {data.blood_group}
        </p>
        <p>
          <strong>Date:</strong> {data.donation_date}
        </p>
        <p>
          <strong>Time:</strong> {data.donation_time}
        </p>
        <p>
          <strong>Message:</strong> {data.message}
        </p>
      </div>
      <button
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => setShowModal(true)}
      >
        Donate
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Donation</h3>
            <p>
              <strong>Donor Name:</strong> {user.displayName}
            </p>
            <p>
              <strong>Donor Email:</strong> {user.email}
            </p>

            {/* Stripe Payment Form */}
            <Elements stripe={stripePromise}>
              <PaymentForm
                donationId={id}
                onSuccess={() => {
                  setShowModal(false);
                  navigate("/dashboard/my-requests");
                }}
              />
            </Elements>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 border rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
