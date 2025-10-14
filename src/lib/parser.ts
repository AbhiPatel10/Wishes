import type { Profile, FamilyMember } from './types';

function extractValue(html: string, label: string): string | undefined {
    const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(
        `<p><strong>${escapedLabel}\\s*:-<\\/strong>\\s*(.*?)<\\/p>`, 'is'
    );
    const match = html.match(regex);
    if (match && match[1]) {
        const value = match[1].replace(/<[^>]*>/g, '').trim();
        return value && value !== '---' ? value : undefined;
    }
    return undefined;
}

export function parseProfile(html: string): Profile {
    const nameMatch = html.match(/<h2>(.*?)<\/h2>/);
    const name = nameMatch?.[1].trim() ?? 'Unknown Name';

    const nameSeed = name.replace(/\s+/g, '-');
    const imageUrl = `https://picsum.photos/seed/${nameSeed}/200/200`;

    const contentMatch = html.match(/<div class="content">(.*?)<div id="family"/s);
    const contentHtml = contentMatch?.[1] ?? html;

    const nativePlace = extractValue(contentHtml, 'Native Place');
    const business = extractValue(contentHtml, 'Business');
    const officeAddress = extractValue(contentHtml, 'Office Address');
    const residenceAddress = extractValue(contentHtml, 'Residential Address');
    const phone = extractValue(contentHtml, 'Tel. No.');
    const mobile = extractValue(contentHtml, 'Mobile No.');
    const email = extractValue(contentHtml, 'Email');
    
    const familyMembers: FamilyMember[] = [];
    const familyTableMatch = html.match(/<div id="family">.*?<table.*?>(.*?)<\/table>/is);
    if (familyTableMatch?.[1]) {
        const familyTableHtml = familyTableMatch[1];
        const rowRegex = /<tr><td>(.*?)<\/td><td>(.*?)<\/td><\/tr>/gis;
        let rowMatch;
        while ((rowMatch = rowRegex.exec(familyTableHtml)) !== null) {
            const memberName = rowMatch[1].trim();
            const relation = rowMatch[2].trim();
            if(memberName && relation && !memberName.toLowerCase().includes('name')){
                familyMembers.push({
                    name: memberName,
                    relation: relation,
                });
            }
        }
    }

    return {
        name,
        imageUrl,
        nativePlace,
        business,
        officeAddress,
        residenceAddress,
        phone,
        mobile,
        email,
        familyMembers,
    };
}
