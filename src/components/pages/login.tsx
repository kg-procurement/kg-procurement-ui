import { Typography } from '@/components/atoms/typography.tsx'
import LoginForm from '@/components/features/login-form.tsx'
import { Footer } from '@/components/molecules/footer.tsx'
import PageHeader from '@/components/molecules/page-header.tsx'

const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col gap-10">
      <PageHeader>
        <Typography variant="h2" className="text-white">
          Login Page
        </Typography>
        <Typography variant="body1" className="text-white">
          Please enter your credentials to login.
        </Typography>
      </PageHeader>

      <div className="flex w-full justify-center">
        <div className="bg-white p-6 rounded shadow-lg">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage
