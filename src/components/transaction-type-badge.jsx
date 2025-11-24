import { cva } from 'class-variance-authority'
import { CircleIcon } from 'lucide-react'

const variants = cva(
  'roudend-full flex w-fit items-center gap-1.5 bg-muted px-2 py-[2px] text-sm font-bold',
  {
    variants: {
      variant: {
        earning: 'text-primary-green fill-primary-green',
        expense: 'text-primary-red fill-primary-red',
        investment: 'text-primary-blue fill-primary-blue',
      },
    },
  }
)

const getText = (variant) => {
  switch (variant) {
    case 'earning':
      return 'Ganho'
    case 'expense':
      return 'Gasto'
    case 'investment':
      return 'Investimento'
    default:
      return ''
  }
}

const TransactionTypeBadge = ({ variant }) => {
  return (
    <div className={variants({ variant })}>
      <CircleIcon size={10} className="fill-inherit" />
      {getText(variant)}
    </div>
  )
}

export default TransactionTypeBadge
