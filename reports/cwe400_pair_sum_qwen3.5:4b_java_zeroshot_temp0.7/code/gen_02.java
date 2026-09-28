import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNextLong()) return;
        long target = scanner.nextLong();
        
        Set<Long> numbers = new HashSet<>();
        int count = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            
            try {
                long val = Long.parseLong(line);
                numbers.add(val);
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        // 2 つの異なる要素が目標値に等しくなる組の数を数える
        // 各要素 x に対して、target - x が集合に含まれているか確認する
        for (long num : numbers) {
            long complement = target - num;
            if (complement != num) {
                // 補数が異なる場合、直接ペアが存在する場合のみカウント
                if (numbers.contains(complement)) {
                    count++;
                }
            } else {
                // 補数と同じ数の場合、その要素が何個あるかを確認
                int freq = 0;
                for (long n : numbers) {
                    if (n == num) freq++;
                }
                if (freq >= 2) {
                    count += freq * (freq - 1) / 2;
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
