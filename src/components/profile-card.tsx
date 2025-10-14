import type { Profile } from '@/lib/types';
import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card';
import Image from 'next/image';
import {
    Users,
    MapPin,
    Briefcase,
    Home,
    Phone,
    Smartphone,
    Mail,
    ArrowLeft,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

function ProfileDetail({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string }) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
                <Icon className="h-5 w-5 text-muted-foreground mt-1" />
            </div>
            <div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-muted-foreground text-sm">{value}</p>
            </div>
        </div>
    );
}

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-4 text-primary hover:text-primary">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Search
            </Link>
        </Button>
        <Card className="overflow-hidden shadow-xl border-t-4 border-primary">
            <CardHeader className="p-0">
                <div className="bg-muted/30 p-8 flex flex-col md:flex-row items-center gap-8">
                    <Image
                        src={profile.imageUrl}
                        alt={`Profile picture of ${profile.name}`}
                        width={160}
                        height={160}
                        className="rounded-full border-4 border-background object-cover shadow-lg"
                        data-ai-hint="portrait person"
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-headline font-bold text-primary">{profile.name}</h1>
                        {profile.nativePlace && (
                            <Badge variant="secondary" className="mt-2 text-base">
                                <MapPin className="mr-1.5 h-4 w-4" />
                                {profile.nativePlace}
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 grid gap-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <ProfileDetail icon={Briefcase} label="Business" value={profile.business} />
                        <ProfileDetail icon={Home} label="Residential Address" value={profile.residenceAddress} />
                        <ProfileDetail icon={Briefcase} label="Office Address" value={profile.officeAddress} />
                    </div>
                    <div className="space-y-6">
                        <ProfileDetail icon={Phone} label="Telephone" value={profile.phone} />
                        <ProfileDetail icon={Smartphone} label="Mobile" value={profile.mobile} />
                        <ProfileDetail icon={Mail} label="Email" value={profile.email} />
                    </div>
                </div>
                
                {profile.familyMembers.length > 0 && (
                    <div>
                        <Separator className="my-6" />
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="h-6 w-6 text-primary" />
                            <h2 className="text-2xl font-headline font-semibold">Family Members</h2>
                        </div>
                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead className="text-right">Relation</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {profile.familyMembers.map((member, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{member.name}</TableCell>
                                            <TableCell className="text-right">{member.relation}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
