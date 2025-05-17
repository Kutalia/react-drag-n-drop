import classes from './PreviewFail.module.css'

interface Props {
  text: string
}

export const PreviewFail: React.FC<Props> = ({ text }) => {
  return <p className={classes.container}>{text}</p>
}