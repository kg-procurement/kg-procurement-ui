import { Typography } from '@/components/atoms/typography.tsx'

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-5">
      <img
        src="kompas-gramedia.jpeg"
        alt="Kompas Gramedia Logo Image"
        className="w-52"
      />
      <div className="flex gap-10">
        <Typography
          variant="body1"
          className="cursor-pointer text-[#828282] hover:font-bold hover:text-[#005288]"
        >
          Evaluation Form
        </Typography>
        <Typography
          variant="body1"
          className="cursor-pointer text-[#828282] hover:font-bold hover:text-[#005288]"
        >
          Search
        </Typography>
      </div>
    </div>
  )
}
