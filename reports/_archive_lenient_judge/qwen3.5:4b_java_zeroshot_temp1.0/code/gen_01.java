import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;
import java.lang.Long;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String input = scanner.nextLine();
            Set<Integer> distinctIntegers = new HashSet<>();
            
            try {
                java.util.StringTokenizer tokenizer = new java.util.StringTokenizer(input, ",");
                while (tokenizer.hasMoreTokens()) {
                    token = tokenizer.nextToken().trim();
                    if (!token.isEmpty() && !token.equals("")) {
                        int value;
                        try {
                            value = Integer.parseInt(token);
                            distinctIntegers.add(value);
                        } catch (NumberFormatException e) {
                            // 整数として解釈できない場合は無視
                        }
                    } else {
                        continue; 
                    }
                }
            } catch(Exception ex) {
                // エラー発生時は処理を継続（あるいは終了）して空セットで扱う
            }

            long count = distinctIntegers.size();
            
        }
    }
}
