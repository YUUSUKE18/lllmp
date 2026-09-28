import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        String targetLine = scanner.nextLine();
        
        if (targetLine != null && !targetLine.trim().isEmpty()) {
            try {
                long target = Long.parseLong(targetLine);
                numbers = new ArrayList<>();
                while (scanner.hasNextLine()) {
                    String line = scanner.nextLine();
                    if (line.trim().isEmpty()) continue;
                    try {
                        int num = Integer.parseInt(line);
                        numbers.add(num);
                    } catch (NumberFormatException e) {
                        continue;
                    }
                }
            } catch (NumberFormatException e) {
                System.out.println("0");
            }
        }
        
        int count = 0;
        List<int[]> pairs = new ArrayList<>();
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                    pairs.add(new int[]{i, j});
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
