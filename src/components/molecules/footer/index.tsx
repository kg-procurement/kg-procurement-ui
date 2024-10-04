import { Typography } from '@/components/atoms/typography/index.tsx'

const Footer = () => {
  return (
    <div className="mt-auto grid h-48 w-full grid-cols-3 gap-6 bg-white p-6">
      <div className="flex flex-col justify-between">
        <div>
          <img
            src="kompas-gramedia.jpeg"
            alt="Kompas Gramedia"
            className="h-16"
          />
        </div>
        <Typography variant="body2" className="ml-8">
          © 2024 KOMPAS
        </Typography>
      </div>
      <div>
        <Typography variant="caption" id="footer-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </div>
      <div className="flex justify-end">
        <Typography variant="subtitle2">Contact us (Email):</Typography>
      </div>
    </div>
  )
}

Footer.displayName = 'Footer'

export { Footer }
