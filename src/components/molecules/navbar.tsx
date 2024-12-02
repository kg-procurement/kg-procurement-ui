import { useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/atoms/button.tsx'
import { Typography } from '@/components/atoms/typography.tsx'
import { useAuthStore } from '@/lib/zustand/auth.ts'

export default function Navbar() {
  const navigate = useNavigate()
  const userId = useAuthStore(state => state.userId)
  const logout = useAuthStore(state => state.logout)

  return (
    <div className="z-[80] flex items-center justify-between px-5">
      <img
        src="/kompas-gramedia.jpeg"
        alt="Kompas Gramedia Logo Image"
        className="w-52"
      />
      <div className="flex items-center gap-10">
        <Typography
          variant="body1"
          className="cursor-pointer text-[#828282] hover:font-bold hover:text-[#005288]"
          onClick={() => navigate({ to: '/email' })}
        >
          Email Status
        </Typography>
        <Typography
          variant="body1"
          className="cursor-pointer text-[#828282] hover:font-bold hover:text-[#005288]"
          onClick={() =>
            navigate({
              to: '/product',
            })}
        >
          Products
        </Typography>
        <Typography
          variant="body1"
          className="cursor-pointer text-[#828282] hover:font-bold hover:text-[#005288]"
          onClick={() =>
            navigate({
              to: '/vendor',
              search: { page: 1, product_name: '', location: '' },
            })}
        >
          Vendors
        </Typography>
        <Typography
          variant="body1"
          className="cursor-pointer text-[#828282] hover:font-bold hover:text-[#005288]"
          onClick={() =>
            navigate({
              to: '/vendor/evaluation-form',
            })}
        >
          Evaluation Form
        </Typography>
        {userId && (
          <Button
            variant="default"
            onClick={() => {
              logout()
              location.reload()
            }}
          >
            Log out
          </Button>
        )}
      </div>
    </div>
  )
}
