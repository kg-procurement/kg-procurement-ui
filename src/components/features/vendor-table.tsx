export interface Vendor {
  name: string
  email: string
  performanceScore: string
}

interface VendorTableProps {
  vendors: Vendor[]
}

const VendorTable = ({ vendors }: VendorTableProps) => {
  return (
    <></>
  )
}

export default VendorTable
