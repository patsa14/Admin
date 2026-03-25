export default function ProjectCard({ project }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
      <p className="text-gray-500 text-sm">{project.location}</p>

      <div className="mt-4">
        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
          Active
        </span>
      </div>
    </div>
  )
}