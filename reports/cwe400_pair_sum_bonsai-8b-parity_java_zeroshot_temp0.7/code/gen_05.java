import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty()) continue;
            try {
                int val = Integer.parseInt(line);
                numbers.add(val);
            } catch (NumberFormatException e) {
                // 忽略
            }
        }
        
        int target = numbers.get(0);
        int n = numbers.size();
        
        List<List<Integer>> pairs = new ArrayList<>();
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    List<Integer> pair = Arrays.asList(numbers.get(i), numbers.get(j));
                    pairs.add(pair);
                }
            }
        }
        
        System.out.println("pairs=" + pairs.size());
    }
}
