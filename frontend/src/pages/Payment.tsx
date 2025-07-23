import React, { useEffect, useState } from "react";

/* Tambahan script loader */
declare global {
  interface Window {
    google: any;
    snap: any;
  }
}


const Payment: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    whatsapp: "",
    address: "",
    postalCode: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedTotal = localStorage.getItem("checkoutTotal");
    if (storedTotal) setTotal(JSON.parse(storedTotal));

    const loadGoogleMaps = () => {
      const existingScript = document.getElementById("googleMapsScript");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY`;
        script.id = "googleMapsScript";
        script.async = true;
        script.defer = true;
        script.onload = () => setMapLoaded(true);
        document.body.appendChild(script);
      } else {
        setMapLoaded(true);
      }
    };

    loadGoogleMaps();
  }, []);

  const handleMapClick = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat, lng } },
      (results: any, status: string) => {
        if (status === "OK" && results[0]) {
          setForm((prev) => ({
            ...prev,
            address: results[0].formatted_address,
          }));
        }
      }
    );
  };

  useEffect(() => {
    if (mapLoaded) {
      const map = new window.google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: -6.2, lng: 106.816666 }, // Default Jakarta
          zoom: 12,
        }
      );

      map.addListener("click", handleMapClick);
    }
  }, [mapLoaded]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const storedItems = localStorage.getItem("checkoutItems");
  let cartItems: any[] = [];

  if (storedItems) {
    cartItems = JSON.parse(storedItems);
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  try {
    const response = await fetch("http://localhost:3001/create-transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          name: form.fullName,
          email: `${form.whatsapp}@dummy.com`, // Email dummy karena Snap wajib ada email
          phone: form.whatsapp,
          address: form.address,
          postalCode: form.postalCode,
        },
        items: cartItems,
        total: totalAmount,
      }),
    });

    const data = await response.json();

    if (data.token) {
      window.snap.pay(data.token, {
        onSuccess: function (result: any) {
          console.log("Success", result);
          setSubmitted(true);
        },
        onPending: function (result: any) {
          console.log("Pending", result);
          setSubmitted(true);
        },
        onError: function (result: any) {
          console.error("Payment failed", result);
          alert("Pembayaran gagal.");
        },
        onClose: function () {
          alert("Popup ditutup tanpa menyelesaikan pembayaran.");
        },
      });
    } else {
      alert("Gagal mendapatkan token pembayaran.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat menghubungi server.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto p-4 py-10 mt-10">
      <h1 className="text-2xl font-bold mb-6">Pembayaran</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              No. WhatsApp
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Alamat Rumah
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="h-64 border rounded" id="map"></div>

          <div>
            <label className="block text-sm font-medium mb-1">Kode Pos</label>
            <input
              type="text"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded transition"
            disabled={loading}>
            {loading ? "Mengirim..." : "Bayar"}
          </button>
        </form>
      ) : (
        <div className="bg-white shadow-md p-6 rounded-lg text-center space-y-4">
          <h2 className="text-xl font-bold text-green-700">
            Silakan lakukan pembayaran
          </h2>
          <p>
            Total:{" "}
            <span className="text-2xl font-semibold text-green-600">
              ${total.toFixed(2)}
            </span>
          </p>
          <p className="font-semibold">BSI 1234567890 a.n. PT Toko Online</p>
          <img
            src="/barcode-sample.png"
            alt="Barcode Pembayaran"
            className="mx-auto w-40 h-40 object-contain mt-4"
          />
          <p className="text-sm text-gray-500">
            * Silakan konfirmasi via WhatsApp setelah transfer.
          </p>
        </div>
      )}
    </div>
  );
};

export default Payment;
