import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) {
            return;
        }

        String line = scanner.nextLine();
        
        // 空行や空白のみの場合への対応
        if (line.trim().isEmpty() || line.trim().contains(",")) {
            System.out.println("count=0 sum=0");
            return;
        }

        // カンマで区切る
        String[] parts = line.split(",");
        Set<Long> distinctNumbers = new HashSet<>();

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(trimmedPart);
                distinctNumbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
                continue;
            }
        }

        long count = distinctNumbers.size();
        long sum = distinctNumbers.stream().map(Long::longValue).sum();

        System.out.println("count=" + count + " sum=" + sum);
    }
}
