import { Typography } from '../atoms/typography/index.tsx'

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-5 ">
      <img
        src="kompas-gramedia.jpeg"
        alt="Kompas Gramedia Logo Image"
        className="w-52"
      />
      <div className="flex gap-10">
        <Typography variant="body1" className="cursor-pointer text-[#828282] hover:text-[#005288] hover:font-bold">Evaluation Form</Typography>
        <Typography variant="body1" className="cursor-pointer text-[#828282] hover:text-[#005288] hover:font-bold">Search</Typography>
      </div>
    </div>
  )
}

export default Navbar