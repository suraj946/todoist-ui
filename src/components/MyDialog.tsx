import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Dispatch, SetStateAction } from "react"

interface MyDialogProps {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  header?:string
  description?:string
  footer?:React.ReactNode
  dissmissable?:boolean
  onDismiss?: () => void
}

const MyDialog: React.FC<MyDialogProps> = ({
  children,
  isOpen,
  setIsOpen,
  header="",
  description="",
  footer,
  dissmissable=true,
  onDismiss = () => {}
}) => {
  const {toast} = useToast()
  const handleClose = (open: boolean) => {
    if(!dissmissable){
      toast({
        title:"Wait a second",
        description:"You can't close this dialog",
        className:"bg-warning border-0 text-xl dark:bg-mixed-1",
      });
      return;
    }
    setIsOpen(open);
    onDismiss();
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]" >
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          {footer && footer} 
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MyDialog