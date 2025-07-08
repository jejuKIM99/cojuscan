// report.js

document.addEventListener('DOMContentLoaded', () => {

    const reportTranslations = {
        ko: {
            reportTitle: "보안 진단 보고서",
            scanInfo: "스캔 정보",
            reportDate: "진단일",
            scanEngine: "스캔 엔진",
            appVersion: "버전",
            projectInfo: "프로젝트 정보",
            projectPath: "경로",
            no: "번호",
            vulnerability: "취약점",
            severity: "심각도",
            file: "파일",
            line: "라인",
            totalVulnerabilities: "총 발견 취약점",
            securityScore: "보안 점수",
            comprehensiveReportTitle: "종합 진단 결과",
            summaryTitle: "진단 요약",
            summaryIntro: (total, high, medium, low, ignored) => `이번 정밀 진단에서 총 ${total + ignored}개의 잠재적 보안 취약점이 발견되었습니다. 이 중 ${ignored}개는 무시 처리되었으며, 유효한 취약점은 <strong>총 ${total}개</strong>입니다. 유효 취약점의 상세 분포는 <strong>심각(High) 등급 ${high}개, 중간(Medium) 등급 ${medium}개, 낮음(Low) 등급 ${low}개</strong>로 분석되었습니다.`,
            commonVulnsTitle: "주요 발견 취약점 (무시 항목 제외)",
            commonVulnsItem: (name, count) => `<strong>'${name}'</strong> 유형이 <strong>${count}회</strong> 발견되어 주요 위험 요소로 식별되었습니다.`,
            detailedActionTitle: "상세 조치 권고",
            detailedActionIntro: "가장 시급하고 중요한 수정 사항은 다음과 같습니다.",
            noHighVulnerability: "심각(High) 등급의 취약점이 발견되지 않았습니다. 중간 등급의 취약점을 검토하고 수정하는 것을 권장합니다.",
            // 1. 모든 항목 무시 시 권고 사항 추가
            allIgnoredRecommendation: "발견된 모든 잠재적 위험을 인지하고 관리 대상으로 지정하셨습니다. 현재 유효한 위험은 없습니다. 다만, 프로젝트의 요구사항 변경이나 새로운 공격 기법에 대응하기 위해 무시한 항목들을 주기적으로 재검토하는 것이 안전합니다.",
            nextStepsTitle: "향후 계획",
            // 2. 결과별 동적 '향후 계획' 추가
            nextStepsContent: {
                excellent: "현재의 높은 보안 수준을 유지하기 위해, 새로운 기능 추가 시 코드 리뷰와 함께 정적 분석을 개발 프로세스의 일부로 정착시키는 것을 권장합니다. CI/CD 파이프라인에 보안 스캔을 통합하여 지속적인 보안을 확보하세요.",
                good: "양호한 상태를 더욱 강화하기 위해, 발견된 중간 등급 취약점들의 근본 원인을 분석하고 팀 내에 공유하여 유사한 실수를 방지하는 것이 중요합니다. 수정 후에는 반드시 재검사를 통해 패치가 올바르게 적용되었는지 확인하세요.",
                moderate: "보안 수준을 한 단계 높이기 위해, 수정된 취약점 외에도 관련 로직 전체를 검토하여 추가적인 위험이 없는지 확인하는 심층 분석이 필요합니다. 또한, 팀원들을 대상으로 시큐어 코딩 교육을 진행하는 것을 고려해 보세요.",
                weak: "긴급 조치 이후, 근본적인 원인 해결을 위해 아키텍처 수준의 보안 설계를 재검토해야 합니다. 외부 보안 전문가의 컨설팅이나 모의 해킹을 통해 현재 인지하지 못한 다른 잠재적 위협이 있는지 확인하는 과정이 필수적입니다."
            },
            conclusionTitle: "결론",
            conclusion: {
                excellent: `전반적으로 우수한 보안 수준을 유지하고 있습니다. 발견된 낮은 등급의 항목들을 검토하여 시스템의 완성도를 더욱 높이시길 권장합니다.`,
                good: `양호한 보안 상태이지만, 발견된 중간 등급의 취약점들은 애플리케이션의 안정성을 저해할 수 있습니다. 해당 항목들에 대한 수정 작업을 진행하는 것이 좋습니다.`,
                moderate: `잠재적인 보안 위협이 존재하는 상태입니다. 특히 '${'${highPriorityName}'}'와 같이 여러 번 발견된 심각 등급의 취약점을 최우선으로 해결하여 공격 표면을 줄여야 합니다.`,
                weak: `즉각적인 조치가 필요한 심각한 보안 위협이 다수 발견되었습니다. '${'${highPriorityName}'}' 취약점 해결을 최우선 과제로 삼고, 전체 시스템에 대한 긴급 보안 점검을 수행할 것을 강력히 권고합니다.`
            }
        },
        en: {
            reportTitle: "SECURITY SCAN REPORT",
            scanInfo: "SCAN INFO",
            reportDate: "Date",
            scanEngine: "Engine",
            appVersion: "Version",
            projectInfo: "PROJECT INFO",
            projectPath: "Path",
            no: "NO",
            vulnerability: "VULNERABILITY",
            severity: "SEVERITY",
            file: "FILE",
            line: "LINE",
            totalVulnerabilities: "Total Vulnerabilities",
            securityScore: "Security Score",
            comprehensiveReportTitle: "Comprehensive Diagnosis Result",
            summaryTitle: "Diagnosis Summary",
            summaryIntro: (total, high, medium, low, ignored) => `This scan found ${total + ignored} potential vulnerabilities. Of these, ${ignored} were ignored, leaving <strong>${total} active vulnerabilities</strong>. The breakdown of active items is <strong>${high} High, ${medium} Medium, and ${low} Low</strong> severity.`,
            commonVulnsTitle: "Key Vulnerabilities Found (excluding ignored)",
            commonVulnsItem: (name, count) => `The <strong>'${name}'</strong> vulnerability was found <strong>${count} times</strong> and is identified as a key risk factor.`,
            detailedActionTitle: "Detailed Action Plan",
            detailedActionIntro: "The most urgent and critical recommendations are as follows:",
            noHighVulnerability: "No High severity vulnerabilities were found. It is recommended to review and fix the Medium severity items.",
            allIgnoredRecommendation: "You have acknowledged and addressed all potential risks found. There are no active risks at this time. However, it is safe practice to periodically review ignored items to adapt to changing project requirements or new threats.",
            nextStepsTitle: "Next Steps",
            nextStepsContent: {
                excellent: "To maintain the current high level of security, we recommend making static analysis a standard part of your development process, especially during code reviews for new features. Integrate security scans into your CI/CD pipeline for continuous security.",
                good: "To further strengthen your good security posture, it's important to analyze the root cause of the detected medium-severity vulnerabilities and share the findings with the team to prevent similar mistakes. Always re-scan after fixes to verify the patches.",
                moderate: "To elevate your security level, a deeper analysis is needed to review the entire related logic, not just the fixed vulnerabilities, to ensure no additional risks exist. Consider conducting secure coding training for team members.",
                weak: "After taking emergency actions, the security architecture must be reviewed to address the root causes. It is essential to verify if there are other unrecognized threats through external security consulting or penetration testing."
            },
            conclusionTitle: "Conclusion",
            conclusion: {
                excellent: `Overall, the project maintains an excellent security level. It is recommended to review the identified low-severity items to further improve system integrity.`,
                good: `The project has a good security posture, but the detected medium-severity vulnerabilities could compromise application stability. It is advisable to proceed with fixing these items.`,
                moderate: `Potential security threats exist. It is crucial to reduce the attack surface by prioritizing the resolution of high-severity vulnerabilities like '${'${highPriorityName}'}', which were found multiple times.`,
                weak: `Multiple critical security threats requiring immediate action have been found. Addressing High-severity vulnerabilities such as '${'${highPriorityName}'}' should be the top priority, and we strongly recommend conducting an emergency security audit of the entire system.`
            }
        }
    };
    
    function generateComprehensiveSummary(lang, results, score, ignoredSet) {
        const t = reportTranslations[lang];

        const allFindingsWithFile = [];
        Object.entries(results).forEach(([file, findings]) => {
            findings.forEach(finding => allFindingsWithFile.push({ ...finding, file }));
        });
        
        const activeFindings = allFindingsWithFile.filter(finding => {
            const findingId = `${finding.file}-${finding.line}-${finding.id}`;
            return !ignoredSet.has(findingId);
        });
        
        const high = activeFindings.filter(f => f.severity === 'High').length;
        const medium = activeFindings.filter(f => f.severity === 'Medium').length;
        const low = activeFindings.filter(f => f.severity === 'Low').length;
        const totalActive = activeFindings.length;
        const totalIgnored = allFindingsWithFile.length - totalActive;

        const counts = {};
        activeFindings.forEach(finding => {
            const name = lang === 'en' ? finding.name_en : finding.name;
            counts[name] = (counts[name] || 0) + 1;
        });

        const sortedVulns = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        
        let summaryHtml = `<h4>${t.summaryTitle}</h4><p>${t.summaryIntro(totalActive, high, medium, low, totalIgnored)}</p>`;
        
        if(sortedVulns.length > 0) {
            summaryHtml += `<h4>${t.commonVulnsTitle}</h4><ul>`;
            sortedVulns.slice(0, 3).forEach(([name, count]) => {
                summaryHtml += `<li>${t.commonVulnsItem(name, count)}</li>`;
            });
            summaryHtml += `</ul>`;
        }
        
        summaryHtml += `<h4>${t.detailedActionTitle}</h4>`;
        
        // 1. 모든 항목을 무시한 경우에 대한 로직 추가
        if (totalActive === 0 && totalIgnored > 0) {
            summaryHtml += `<p>${t.allIgnoredRecommendation}</p>`;
        } else {
            const highPriorityVulns = activeFindings.filter(f => f.severity === 'High');
            if (highPriorityVulns.length > 0) {
                const mostCriticalVuln = highPriorityVulns[0];
                const name = lang === 'en' ? mostCriticalVuln.name_en : mostCriticalVuln.name;
                const recommendation = lang === 'en' ? mostCriticalVuln.recommendation_en : mostCriticalVuln.recommendation_ko;
                summaryHtml += `<p>${t.detailedActionIntro}</p><blockquote><strong>${name}:</strong> ${recommendation}</blockquote>`;
            } else {
                summaryHtml += `<p>${t.noHighVulnerability}</p>`;
            }
        }

        let conclusionKey;
        if (score >= 90) conclusionKey = 'excellent';
        else if (score >= 70) conclusionKey = 'good';
        else if (score >= 40) conclusionKey = 'moderate';
        else conclusionKey = 'weak';
        
        // 2. 동적인 '향후 계획' 선택 로직 추가
        summaryHtml += `<h4>${t.nextStepsTitle}</h4><p>${t.nextStepsContent[conclusionKey]}</p>`;
        
        let conclusionText = t.conclusion[conclusionKey];
        if (high > 0 && sortedVulns.length > 0) {
            const highPriorityName = sortedVulns.find(([name, count]) => {
                return activeFindings.some(f => (lang === 'en' ? f.name_en : f.name) === name && f.severity === 'High');
            });
            if(highPriorityName) {
               conclusionText = conclusionText.replace('${highPriorityName}', highPriorityName[0]);
            }
        }
        
        summaryHtml += `<h4>${t.conclusionTitle}</h4><p>${conclusionText}</p>`;
        
        document.getElementById('summary-text').innerHTML = summaryHtml;
    }


    window.electronAPI.onRenderReportData((data) => {
        const { results, score, projectPath, lang, version, logoData, ignored } = data || {};
        
        const ignoredSet = new Set(ignored || []);

        if (logoData) {
            document.getElementById('logo').src = logoData;
            document.getElementById('logo2').src = logoData;
        }
        
        const today = new Date().toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-CA');
        document.getElementById('report-date').textContent = today;
        document.getElementById('report-date-2').textContent = today;
        document.getElementById('project-path').textContent = projectPath || 'N/A';
        document.getElementById('app-version').textContent = version || 'N/A';

        const vulnList = document.getElementById('vulnerabilities-list');
        vulnList.innerHTML = '';
        let totalCount = 0;
        let counter = 1;

        if (results) {
            Object.keys(results).forEach(file => {
                results[file].forEach(finding => {
                    totalCount++;
                    const tr = document.createElement('tr');
                    const name = lang === 'en' ? (finding.name_en || finding.name) : finding.name;
                    const findingId = `${file}-${finding.line}-${finding.id}`;
                    
                    if (ignoredSet.has(findingId)) {
                        tr.classList.add('ignored-row');
                    }
                    
                    tr.innerHTML = `
                        <td>${counter++}</td>
                        <td>${name}</td>
                        <td class="severity-${finding.severity}">${finding.severity}</td>
                        <td>${file}</td>
                        <td>${finding.line}</td>
                    `;
                    vulnList.appendChild(tr);
                });
            });
        }

        document.getElementById('total-vulnerabilities').textContent = totalCount;
        document.getElementById('security-score').textContent = score || 0;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (reportTranslations[lang] && reportTranslations[lang][key]) {
                el.textContent = reportTranslations[lang][key];
            }
        });
        
        if (results) {
            generateComprehensiveSummary(lang, results, score, ignoredSet);
        }

        window.electronAPI.reportReadyForPDF();
    });
});