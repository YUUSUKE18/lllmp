import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        if (firstLine == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount;
        try {
            expectedCount = Integer.parseInt(firstLine.trim());
        } catch (NumberFormatException e) {
            // 1 行目の解析が失敗した場合、カウントは 0 とします。
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            try {
                // 行が整数を含んでいるかチェックし、存在するだけカウント
                int num = Integer.parseInt(line.trim());
                
                // 文字列に数値が含まれている場合のみカウント（ここでは一行に一つの整数と想定）
                // ただし、問題文「実際に読み取れた整数だけ」という条件により、
                // 解析可能なものだけを処理します。
                // 注意点：Java の parseInt は最初からマッチするまでスキャンします。
                // しかし入力は「1 行に 1 個ずつ」と指定されているため、trim() で囲むとそのまま数値になります。
                
                count++;
                sum += num;
            } catch (NumberFormatException e) {
                // 解析できない場合は無視（問題文：整数として解釈できない行も無視します）
                // ただし、入力の形式が厳格でない場合（例: "abc 123"）、
                // parseInt は例外を投げます。この場合、「実際に読み取れた整数だけ」を意味して、
                // その部分だけをカウントするか、完全に破棄するか解釈が必要です。
                // 通常の入力例を考えると、解析失敗時の行は無視する方が安全です。
                // また、parseInt は部分数値にも成功しないため、「123abc」といった形は読み取れません。
                // そのような場合でも、行数の増加はありえません。
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
