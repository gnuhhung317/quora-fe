type Topic = {
  name: string;
  color: string;
};

export default function Sidebar() {
  const topics: Topic[] = [
    { name: "Self-Improvement", color: "bg-yellow-500" },
    { name: "Beginner coder", color: "bg-red-500" },
    { name: "Online Communities", color: "bg-blue-500" },
    { name: "Internet Forums", color: "bg-green-500" },
    { name: "Websites", color: "bg-red-500" },
    { name: "Technology", color: "bg-black" },
  ];

  return (
    <>

      <ul className="space-y-2">
        {topics.map((topic, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className={`${topic.color} h-2 w-2 rounded-full`}></span>
            <span>{topic.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
