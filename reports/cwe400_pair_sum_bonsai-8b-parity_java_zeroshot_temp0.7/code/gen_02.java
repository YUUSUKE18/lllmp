import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        List<Integer> numbers = new ArrayList<>();
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (line.isEmpty() || !isInteger(line)) continue;
            numbers.add(Integer.parseInt(line));
        }
        
        int target = numbers.get(0);
        Scanner numScanner = new Scanner(System.in);
        
        int count = 0;
        Set<Integer> seen = new HashSet<>();
        
        for (int i = 1; i < numbers.size(); i++) {
            int num = numbers.get(i);
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(j) == target - num && !seen.add(numbers.get(j))) {
                    count++;
                    seen.add(numbers.get(j));
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
    
    private static boolean isInteger(String s) {
        try {
            Integer.parseInt(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
