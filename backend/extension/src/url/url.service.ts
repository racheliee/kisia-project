import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UrlService {
    private readonly logger = new Logger(UrlService.name);
    constructor(private readonly prismaService: PrismaService) { };

    // Process URL (check with db and API)==============================================
    async processUrl(url: string) {
        // check if url exists in our own database
        const databaseResult = await this.prismaService.url.findUnique({
            where: { url: url },
        });

        if (databaseResult) { // return if found
            // console.log('Found in database:', existingUrl);
            // update access count
            await this.prismaService.url.update({
                where: {url: url},
                data:{
                    accessCount: databaseResult.accessCount + 1,
                }
            });

            // return value
            return {
                url: databaseResult.url,
                isMalicious: databaseResult.isMalicious,
                source: 0,
            }
        }

        // if not, check external APIs
        const apiCheckResult = await this.checkExternalApis(url);

        if (apiCheckResult) {
            this.saveToDatabase(url, true);
        }
        
        return {
            url: url,
            isMalicious: apiCheckResult,
            source: 1,
        }
    }

    // Save to database =============================================================
    async saveToDatabase(url: string, isMalicious: boolean) {
        const result = await this.prismaService.url.create({
            data: {
                url: url,
                isMalicious: isMalicious,
                accessCount: 1,
            }
        });

        return result;
    }

    // Checking external APIs =======================================================   
    async checkExternalApis(url: string) {
        const result = await Promise.all([
            this.checkLinkShieldAPI(url),
            // this.checkGoogleSafeBrowsingAPI(url),
            // this.checkPhishTankAPI(url),
            // this.checkURLhausAPI(url),
            this.checkURLVoidAPI(url),
        ]);

        return result.some((r) => r === true);
    }

    async checkLinkShieldAPI(url: string) {
        const base_url = new URL("https://linkshieldapi.com/api/v1/link/score");

        const headers = {
            "Authorization": "Bearer " + process.env.LINK_SHIELD_API_KEY,
            "Content-Type": "application/json",
            "Accept": "application/json"
        };

        let body = {
            "url": url,
            "follow_redirects": true
        };

        try {
            const response = await fetch(base_url, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) { // check for HTTP error
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log(JSON.stringify(data, null, 2));

            const isMalicious = data.risk_score > 70 || data.security_checks.domain_flagged || data.security_checks.url_flagged || data.security_checks.ai_flagged;

            return isMalicious;
        } catch (error) {
            this.logger.error(`Error in checking LinkShield API: ${error}`);
            throw error;
        }
    }

    async checkGoogleSafeBrowsingAPI(url: string) { }

    async checkPhishTankAPI(url: string) { }

    async checkURLhausAPI(url: string) { }

    async checkURLVoidAPI(url: string) {
        const base_url = new URL("https://endpoint.apivoid.com/urlrep/v1/pay-as-you-go/");
        base_url.searchParams.append("key", process.env.URL_VOID_API_KEY);
        base_url.searchParams.append("url", url);

        // console.log(base_url);

        try {
            const response = await fetch(base_url);

            if (!response.ok) { // check for HTTP error
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success === false) {
                throw new Error(`URL Void API error: ${data.message}`);
            }

            console.log(JSON.stringify(data, null, 2));

            const isMalicious = data.data.report.risk_score.result > 70 ||
            data.data.report.domain_blacklist.detections > 0 ||
            data.data.report.security_checks.is_suspicious_url_pattern ||
            data.data.report.security_checks.is_domain_blacklisted ||
            data.data.report.security_checks.is_phishing_heuristic ||
            data.data.report.security_checks.is_defaced_heuristic ||
            data.data.report.security_checks.is_risky_geo_location ||
            data.data.report.security_checks.is_masked_file ||
            data.data.report.security_checks.is_suspicious_content;


            // return {
            //     isMalicious: isMalicious,
            //     type: null,
            // }

            return isMalicious;
        } catch (error) {
            this.logger.error(`Error in checking URLVoid API: ${error}`);
            throw error;
        }
    }

}
