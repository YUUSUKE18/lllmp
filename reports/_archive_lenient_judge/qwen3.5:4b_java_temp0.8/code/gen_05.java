import java.io.BufferedReader;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;

        Set<Integer> distinctIntegers = new HashSet<>();
        
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            StringTokenizer tokenizer = new StringTokenizer(line);
            
            while (tokenizer.hasMoreTokens()) {
                try {
                    int num = Integer.parseInt(tokenizer.nextToken()); // 64bit に収まるか確認（仕様通り）
                    distinctIntegers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        long count = distinctIntegers.size();
        long sum = 0;
        
        for (Integer num : distinctIntegers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
