import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        int target = 0;
        
        // 第1行を目標値として読み込む
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty() && Integer.isInteger(line)) {
                target = Integer.parseInt(line);
            }
        }
        
        // 前後の入力処理
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty() && Integer.isInteger(line)) {
                numbers.add(Integer.parseInt(line));
            }
        }
        
        int count = 0;
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
