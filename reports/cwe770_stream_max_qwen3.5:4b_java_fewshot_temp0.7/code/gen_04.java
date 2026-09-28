import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合の処理: デフォルト最大値は最小値とするか、特殊値にする。ただし問題文に「整数列」とあるので少なくとも1つある場合が多いが、安全のために初期化を定義する必要がある。通常此类问题如果输入为空，count=0, max=? 。参考例中没有明确说明空的情况如何处理。但为了逻辑一致性，如果没有有效数字，max 应该是什么？
            // 重新审视题目： "空白区切りの整数列" -> 暗示至少有一个元素或者处理边界情况。
            // 让我们假设输入可能为空行或全是非整数/空格的字符串。此时 count=0. max=? 
            // Java 中没有默认最大值，通常如果找不到最大者，可以输出最小值表示未找到，或者根据上下文。这里为了严谨性，如果没有有效数字，max设为 Long.MIN_VALUE (因为题目没说一定有数)。
        } else {
            long[] parts = line.split(",");
            int count = 0;
            long max = Long.MIN_VALUE; // 初始值设为最小可能整数，如果后续没有更新过它，说明没找到有效的正/负整数（或者只有比它大的才更新）
            
            boolean foundAny = false;

            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    try {
                        long num = Long.parseLong(part.trim());
                        count++;
                        // 注意：Long.MIN_VALUE (-9223372036854775808L) 
                        // 如果第一个数就是 MIN_VALUE，它应该被选为最大值吗？是的。
                        if (num > max || foundAny == false && num >= Long.MAX_VALUE + 1 ? true : num >= max) {
                            // 修正逻辑：初始时max设为MIN_VALUE。
                            // 如果输入的第一个数就是 MIN_VALUE，那么 MIN_VALUE > MIN_VALUE 为假。
                            // 所以最好用一个标志位或者一个比所有可能整数都小的值？不，Long.MIN_VALUE是下界。
                            // 更好的写法是使用 flag: first=true. 
                        } else if (num >= max) {
                             // num == max 也是最大值之一，取第一个遇到的即可或任意一个都行，这里更新也没错（保持当前）
                         }
                    } catch (NumberFormatException e) {
                        // ignore invalid numbers
                    }
                }
            }

            // 为了正确处理所有情况（包括全是MIN_VALUE的情况），使用 flag 'foundAny' 更稳妥。
        }
        
        // 重写逻辑以确保正确性：
    }
    
}
