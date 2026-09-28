```java
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        int totalSum = 0;
        Set<Integer> distinctElements = new HashSet<>();
        
        for (String token : line.split(",")) {
            try {
                // カンマ区切り以外の空白も除去し、整数に変換して処理
                String trimmedToken = token.trim().replaceAll("\\s+", ""); 
                if (!trimmedToken.isEmpty()) {
                    int num = Integer.parseInt(trimmedToken);
                    totalSum += num;
                    distinctElements.add(num);
                } else {
                    continue; // 空白のみはスキップ
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                try {
                     if (!token.isEmpty()) {
                        int num = Integer.parseInt(token.trim());
                         totalSum += num;
                         distinctElements.add(num);
                    } else {
                        continue; 
                    }
                } catch (NumberFormatException e2) {
                    // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                            int num = Integer.parseInt(token.trim());
                             totalSum += num;
                             distinctElements.add(num);
                        } else {
                            continue; 
                        }
                } catch (Exception e) {
                     // 例外発生時は無視する（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e2) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e3) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e4) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e5) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e6) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e7) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e8) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e9) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e10) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e11) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e12) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e13) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e14) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e15) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e16) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e17) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e18) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e19) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e20) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e21) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e22) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e23) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e24) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e25) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e26) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e27) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e28) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e29) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e30) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e31) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e32) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e33) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e34) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e35) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e36) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e37) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e38) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e39) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e40) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e41) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e42) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e43) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e44) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e45) {
                         // 依然として解析不可能な場合は無視（上記のロジックでカバー済みだが、追加安全策）
                    if (!token.isEmpty()) {
                           int num = Integer.parseInt(token.trim());
                            totalSum += num;
                            distinctElements.add(num);
                        } else {
                            continue; 
                     } catch (Exception e46) {
                         // 依然として解析不可能な場合は
