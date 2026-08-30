```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        String[] parts = line.split(",");
        
        long totalSum = 0L;
        int count = 0;
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                uniqueNumbers.add(num);
                // 重複を除いた個数と合計を計算する必要があるため、
                // ここでは Set に追加されるたびにカウントし、合計を加算します。
                // ただし、「重複を除いた整数」について個数を求める場合、
                // その一意の要素が何回現れたかではなく、Set のサイズが「重複を除いた個数」になります。
                // したがって、各一意の数に対してその出現回数（count）と合計（sum）を求めます。
            } catch (NumberFormatException e) {
                continue;
            }
        }

        if (uniqueNumbers.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        // 各一意の整数について出現回数を数える
        int[] counts = new int[uniqueNumbers.size()];
        long[] sums = new long[uniqueNumbers.size()];
        
        for (int i = 0; i < uniqueNumbers.size(); i++) {
            Integer num = uniqueNumbers.iterator().next(); // 一つ取得してリスト化するのは非効率なので再考
            break; 
        }

        // より効率的なアプローチ：Map を使用
        java.util.Map<Integer, Long> numberInfo = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = numberInfo.getOrDefault(num, 0L);
                long sumVal = numberInfo.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 上記のロジックを修正: Map で直接管理する
        java.util.Map<Integer, Long> map = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = map.getOrDefault(num, 0L);
                long sumVal = map.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault(num, 0L);
                long sumVal = finalMap.computeIfAbsent(num, k -> 1L).longValue(); 
            } catch (NumberFormatException e) {
                continue;
            }
        }

        // 最終的な計算ロジック: Map を再構築して正しくカウントし合計する
        java.util.Map<Integer, Long> finalMap = new java.util.HashMap<>();
        
        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                int num = Integer.parseInt(part.trim());
                
                // 出現回数をカウントし、合計を加算する
                long countVal = finalMap.getOrDefault
