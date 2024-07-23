export default function Contact() {
  const contacts = [
    {
      name: "Sarthak",
      post: "Hospitality Manager",
      img: "",
      phone: "8767086190",
    },
    {
      name: "Pratik",
      post: "Hospitality Manager",
      img: "",
      phone: "9765599815",
    },
  ];

  return (
    <div>
      <div className="">
        <div className="text-white text-4xl font-bold text-center pb-3">
          Contact Us
        </div>
        <div className="flex flex-wrap justify-evenly gap-4">
          {contacts.map((contact) => (
            <div className="bg-white p-5 rounded-lg w-full sm:max-w-[280px] flex sm:flex-col">
              <img
                className="border-2 border-slate-800 rounded-full w-1/2 sm:w-full aspect-square"
                src={contact.img}
                alt="Contact Img"
              />
              <div className="w-full pl-4 flex flex-col justify-center gap-1 items-start sm:items-center">
                <div className="text-lg font-bold">{contact.name}</div>
                <div>{contact.post}</div>
                <a
                  href={`tel:${contact.phone}}`}
                  className="border border-gray-500 rounded-md p-1 text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="inline -translate-y-[0.14rem]"
                  >
                    <path
                      fill="black"
                      d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.1-.27c1.2.5 2.5.78 3.9.78a1 1 0 011 1v3.5a1 1 0 01-1 1C8.61 21 3 15.39 3 8a1 1 0 011-1h3.5a1 1 0 011 1c0 1.4.28 2.7.78 3.9a1 1 0 01-.27 1.09l-2.2 2.2z"
                    />
                  </svg>
                  {contact.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
