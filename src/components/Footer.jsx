import { FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-8 absolute bottom-0 w-screen">
      <div className="container mx-auto">
        <div className="flex justify-between mt-4 items-center">
          <p className="text-white text-xl">Chris Hildebrand</p>
          <div className="flex w-36 justify-between">
            <a
              href="https://www.linkedin.com/in/chris-hildebrand-baaa64185/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2 hover:text-gray-300"
            >
              <FaLinkedin size={36} />
            </a>
            <a
              href="https://github.com/Childebrand94"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2 hover:text-gray-300"
            >
              <FaGithub size={36} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
