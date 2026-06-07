"use client"

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, MoreHorizontal, Mail, Phone, Calendar } from "lucide-react"

const mockMembers = [
  { id: "1", name: "Alice Johnson", email: "alice.j@example.com", phone: "(555) 123-4567", joinDate: "Jan 12, 2023", status: "Active", initials: "AJ" },
  { id: "2", name: "Robert Smith", email: "r.smith@provider.net", phone: "(555) 987-6543", joinDate: "Mar 05, 2023", status: "Active", initials: "RS" },
  { id: "3", name: "Elena Rodriguez", email: "elena.rod@mail.com", phone: "(555) 246-1357", joinDate: "Jun 20, 2023", status: "Inactive", initials: "ER" },
  { id: "4", name: "David Kim", email: "dkim@university.edu", phone: "(555) 369-1470", joinDate: "Oct 15, 2023", status: "Active", initials: "DK" },
  { id: "5", name: "Sarah Williams", email: "sarah.w@service.org", phone: "(555) 753-9514", joinDate: "Dec 01, 2023", status: "Active", initials: "SW" },
]

export default function MembersPage() {
  const [search, setSearch] = useState("")

  return (
    <div className="space-y-6 animate-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Member Registry</h1>
          <p className="text-muted-foreground mt-1">Manage library memberships and contact information.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2 shadow-sm">
          <UserPlus className="w-4 h-4" />
          Add Member
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search by name, email or phone..." 
          className="pl-10 bg-white border-muted max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[300px]">Member</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMembers.map((member) => (
              <TableRow key={member.id} className="hover:bg-accent/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border border-muted">
                      <AvatarFallback className="bg-primary/5 text-primary font-bold">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-primary">{member.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">ID: LIB-{member.id}092</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      {member.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      {member.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {member.joinDate}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={cn(
                      "font-medium",
                      member.status === "Active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-muted text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}